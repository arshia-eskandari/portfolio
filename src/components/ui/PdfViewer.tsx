function PDFViewer({ fileUrl }: { fileUrl: string }) {
  const viewerUrl = `https://docs.google.com/gview?url=${fileUrl}&embedded=true`;

  return (
    <iframe
      src={viewerUrl}
      width="100%"
      height="100%"
      style={{ border: "none" }}
      allowFullScreen
      className="h-[600px] w-[350px] md:w-[650px]"
    ></iframe>
  );
}

export default PDFViewer;
