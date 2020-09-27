const TOKEN = 'TDlRJi8ORMGVrMedVkZDXsUDK'

const getImgsFromImg = async (img, radius) => {
    const formData = new FormData();

    formData.append('token', TOKEN)
    formData.append('action', 'faiss_search')
    formData.append('radius', radius)
    formData.append('with_embeddings', 'False')
    formData.append('file1', img, 'image.jpg');

    try {
      const response = await fetch('https://lukoshkoapi.kloop.io:5000/', {
        method: 'POST',
        body: formData
      });
      let result = await response.json();
      console.log(result)
      const img_data = []
      result.forEach(r => {
            const data = []
            Object.values(r.metadata).forEach(v => {
              const img = {
                key: v.file_path + v.frame_index.toString() + JSON.stringify(v.object_box),
                date: new Date(v.appearance_time),
                url: ("https://kloopstorage.blob.core.windows.net/activ-sync/" +
                    v.file_path.split("/")[3] +
                    "/" +
                    v.file_path.split("/")[4].replace(":", ".") +
                    "/" +
                    v.frame_index.toString() +
                    ".jpg"),
                distance: v.distance,
                tags: [],
                negtags: []
              }
              data.push(img)
            })
            img_data.push(...data)
          })
      console.log(img_data)
      return img_data

    } catch (error) {
      console.error('Ошибка:', error);
      alert('Ошибка:', error)
    }
}

export default getImgsFromImg;