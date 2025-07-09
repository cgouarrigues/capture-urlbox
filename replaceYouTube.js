(() => {
      const waitForIframesWithSrc = async (retries = 20, delay = 300) => {
        while (retries-- > 0) {
          const iframes = [...document.querySelectorAll("iframe.vds-youtube")];
          const ready = iframes.filter(iframe => iframe.getAttribute("src")?.includes("youtube"));
          if (ready.length > 0) return ready;
          await new Promise(res => setTimeout(res, delay));
        }
        return [];
      };

      waitForIframesWithSrc().then(iframes => {
        if (iframes.length === 0) return;
        iframes.forEach((iframe) => {
          const src = iframe.getAttribute("src") || "";
          const match = src.match(/embed\\/([a-zA-Z0-9_-]{11})/);
          if (!match) return;
          const videoId = match[1];
          const img = document.createElement("img");
          img.src = \`https://img.youtube.com/vi/\${videoId}/maxresdefault.jpg\`;
          img.width = iframe.offsetWidth || 800;
          img.height = iframe.offsetHeight || 450;
          img.style.borderRadius = "12px";
          iframe.replaceWith(img);
        });
      });
    })()
