const downloadFile = (data, contentType, name, extension) => {
  const blob =
    data instanceof Blob ? data : new Blob([data], { type: contentType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name + extension;
  a.click();
  URL.revokeObjectURL(url);
};

async function saveFile(
  description,
  contentType,
  extension,
  data,
  suggestedName = ""
) {
  try {
    if (window.showSaveFilePicker) {
      const opts = {
        suggestedName,
        types: [
          {
            description,
            accept: { [contentType]: [extension] },
          },
        ],
      };

      const handler = await window.showSaveFilePicker(opts);
      const file = await handler.createWritable();

      await file.write(data);
      await file.close();
    } else {
      downloadFile(data, contentType, suggestedName, extension);
    }
  } catch (e) {
    console.error(e);
    throw new Error("Failed to save file: " + e);
  }
}

export { downloadFile, saveFile };
