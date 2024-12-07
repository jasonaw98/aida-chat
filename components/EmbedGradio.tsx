const EmbedPage = () => {
  return (
    <div className="flex h-full">
      <iframe
        src={process.env.NEXT_ZYGY_GRADIO_URL}
        className="w-full h-full rounded-xl"
      ></iframe>
    </div>
  );
};

export default EmbedPage;
