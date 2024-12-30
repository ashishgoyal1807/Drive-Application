import { useState } from "react"
import axios from 'axios'
import { useSelector } from "react-redux"

export default function NewPost() {
  const [file, setFile] = useState()
  const [caption, setCaption] = useState("")
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);


  const submit = async event => {
    event.preventDefault()

    const formData = new FormData();
    formData.append("image", file)
    formData.append("id", user._id);
    formData.append("email", user.email);

    // await axios.post("http://localhost:3001/api/posts", formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    const response = await fetch(`http://localhost:3001/api/posts`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`
      },
      body: formData,
    });
  }

  return (
    <form onSubmit={submit}>
      <input
        onChange={e => setFile(e.target.files[0])} type="file" accept="image/*, text/*, .pdf, video/*"></input>

      <button type="submit">Submit</button>
    </form>
  )
}