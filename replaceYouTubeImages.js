(() => {
  const waitForIframesWithSrc = async (retries = 20, delay = 300) => {
    while (retries-- > 0) {
      const iframes = [...document.querySelectorAll("iframe.vds-youtube")];
      const ready = iframes.filter(iframe => iframe.getAttribute("src")?.includes("youtube"));
      if (ready.length > 0) {
        console.log("✅ YouTube iframe(s) found:", ready.map(f => f.getAttribute("src")));
        return ready;
      }
      await new Promise(res => setTimeout(res, delay));
    }
    console.warn("⚠️ No iframe with YouTube src detected after waiting.");
    return [];
  };

  waitForIframesWithSrc().then(iframes => {
    if (iframes.length === 0) {
      console.warn("⚠️ No iframes replaced.");
      return;
    }

    iframes.forEach((iframe, index) => {
      const src = iframe.getAttribute("src") || "";
      const match = src.match(/embed\/([a-zA-Z0-9_-]{11})/);
      if (!match) {
        console.warn(`⚠️ No video ID match in iframe ${index} src: ${src}`);
        return;
      }

      const videoId = match[1];
      console.log(`🎯 Replacing iframe ${index} with YouTube thumbnail for ID: ${videoId}`);

      const img = document.createElement("img");
      img.src = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      img.width = iframe.offsetWidth || 800;
      img.height = iframe.offsetHeight || 450;
      img.style.borderRadius = "12px";
      img.alt = `YouTube Thumbnail - ${videoId}`;
      iframe.replaceWith(img);
    });
  });
})();
