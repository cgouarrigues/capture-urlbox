(async () => {
  const waitForIframes = async (tries = 20, delay = 300) => {
    while (tries-- > 0) {
      const iframes = [...document.querySelectorAll("iframe.vds-youtube")].filter(f => f.src?.includes("youtube"));
      if (iframes.length) return iframes;
      await new Promise(r => setTimeout(r, delay));
    }
    return [];
  };

  const iframes = await waitForIframes();
  iframes.forEach(f => {
    const match = f.src.match(/embed\/([\w-]{11})/);
    if (match) {
      const img = document.createElement("img");
      img.src = `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`;
      img.width = f.offsetWidth || 800;
      img.height = f.offsetHeight || 450;
      img.style.borderRadius = "12px";
      f.replaceWith(img);
    }
  });
})();
