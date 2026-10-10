import { useState } from "react";

const IMAGE_EXTENSIONS = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

const MAX_COVER_SIZE = 10 * 1024 * 1024; // 10 MB
const MAX_PDF_SIZE = 50 * 1024 * 1024;   // 50 MB

function getErrorMessage(error) {
  return error instanceof Error
    ? error.message
    : "Não foi possível adicionar o livro. Tente novamente.";
}

export default function AddBookForm({ supabase }) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [cover, setCover] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    setFeedback(null);

    if (!supabase) {
      setFeedback({
        type: "error",
        message: "O cliente Supabase não foi configurado.",
      });
      return;
    }

    const priceMzn = Number(price);
    const coverExtension = cover && IMAGE_EXTENSIONS[cover.type];

    if (!Number.isSafeInteger(priceMzn) || priceMzn <= 0) {
      setFeedback({
        type: "error",
        message: "Introduza um preço válido em MZN (número inteiro maior que zero).",
      });
      return;
    }
    if (!cover || !coverExtension) {
      setFeedback({
        type: "error",
        message: "Seleccione uma capa JPG, PNG, WebP ou GIF.",
      });
      return;
    }
    if (cover.size > MAX_COVER_SIZE) {
      setFeedback({
        type: "error",
        message: "A imagem da capa deve ter no máximo 10 MB.",
      });
      return;
    }
    if (!pdf || pdf.type !== "application/pdf") {
      setFeedback({
        type: "error",
        message: "Seleccione um ficheiro PDF válido.",
      });
      return;
    }
    if (pdf.size > MAX_PDF_SIZE) {
      setFeedback({
        type: "error",
        message: "O PDF deve ter no máximo 50 MB.",
      });
      return;
    }

    setLoading(true);
    try {
      const coverPath = `${crypto.randomUUID()}.${coverExtension}`;
      const pdfPath = `${crypto.randomUUID()}.pdf`;

      // 1. Upload da capa para o bucket "covers"
      const { error: coverError } = await supabase.storage
        .from("covers")
        .upload(coverPath, cover, { contentType: cover.type, upsert: false });
      if (coverError) throw coverError;

      // 2. Upload do PDF para o bucket "books-pdf"
      const { error: pdfError } = await supabase.storage
        .from("books-pdf")
        .upload(pdfPath, pdf, { contentType: "application/pdf", upsert: false });
      if (pdfError) throw pdfError;

      // 3. Obter URLs públicos
      const coverUrl = supabase.storage.from("covers").getPublicUrl(coverPath)
        .data.publicUrl;
      const pdfUrl = supabase.storage.from("books-pdf").getPublicUrl(pdfPath)
        .data.publicUrl;

      if (!coverUrl || !pdfUrl) {
        throw new Error("Não foi possível gerar os links públicos dos ficheiros.");
      }

      // 4. Inserir dados na tabela "products"
      const { error: productError } = await supabase.from("products").insert({
        title: title.trim(),
        price_mzn: priceMzn,
        synopsis: synopsis.trim(),
        cover_url: coverUrl,
        pdf_url: pdfUrl,
        pdf_path: pdfPath,
      });
      if (productError) throw productError;

      // Limpar formulário após sucesso
      setTitle("");
      setPrice("");
      setSynopsis("");
      setCover(null);
      setPdf(null);
      event.currentTarget.reset();
      setFeedback({ type: "success", message: "Livro adicionado com sucesso à livraria!" });
    } catch (error) {
      setFeedback({ type: "error", message: getErrorMessage(error) });
    } finally {
      setLoading(false);
    }
  }

  const feedbackStyles =
    feedback?.type === "success"
      ? "border-green-200 bg-green-50 text-green-800"
      : "border-red-200 bg-red-50 text-red-800";

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-2xl space-y-5 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-8"
    >
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Adicionar livro</h2>
        <p className="mt-1 text-sm text-slate-600">
          Preencha os dados e carregue a capa e o ficheiro PDF.
        </p>
      </div>

      <div>
        <label htmlFor="book-title" className="mb-1.5 block text-sm font-medium text-slate-700">
          Título
        </label>
        <input
          id="book-title"
          name="title"
          type="text"
          autoComplete="off"
          required
          maxLength={200}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <div>
        <label htmlFor="book-price" className="mb-1.5 block text-sm font-medium text-slate-700">
          Preço (MZN)
        </label>
        <input
          id="book-price"
          name="price"
          type="number"
          min="1"
          step="1"
          required
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <div>
        <label htmlFor="book-synopsis" className="mb-1.5 block text-sm font-medium text-slate-700">
          Sinopse
        </label>
        <textarea
          id="book-synopsis"
          name="synopsis"
          rows={5}
          required
          maxLength={5000}
          value={synopsis}
          onChange={(event) => setSynopsis(event.target.value)}
          className="w-full resize-y rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="book-cover" className="mb-1.5 block text-sm font-medium text-slate-700">
            Ficheiro da capa (imagem)
          </label>
          <input
            id="book-cover"
            name="cover"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            required
            onChange={(event) => setCover(event.target.files?.[0] ?? null)}
            className="block w-full text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:font-medium file:text-slate-700 hover:file:bg-slate-200"
          />
          <p className="mt-1 text-xs text-slate-500">JPG, PNG, WebP ou GIF · máximo 10 MB</p>
        </div>

        <div>
          <label htmlFor="book-pdf" className="mb-1.5 block text-sm font-medium text-slate-700">
            Ficheiro do PDF
          </label>
          <input
            id="book-pdf"
            name="pdf"
            type="file"
            accept="application/pdf,.pdf"
            required
            onChange={(event) => setPdf(event.target.files?.[0] ?? null)}
            className="block w-full text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:font-medium file:text-slate-700 hover:file:bg-slate-200"
          />
          <p className="mt-1 text-xs text-slate-500">PDF · máximo 50 MB</p>
        </div>
      </div>

      {feedback && (
        <p
          role={feedback.type === "error" ? "alert" : "status"}
          className={`rounded-lg border px-4 py-3 text-sm ${feedbackStyles}`}
        >
          {feedback.message}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-blue-700 px-4 py-3 font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {loading ? "A adicionar..." : "Adicionar Livro"}
      </button>
    </form>
  );
}