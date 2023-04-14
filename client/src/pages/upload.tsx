import { FormEvent, useRef, useState } from "react";
import { trpc } from "@/utils/trpc";
import { serverUrl } from "@/data/url";

export default function UploadPage() {
  const [responseMsg, setResponseMsg] = useState("");
  const [uploads, setUploads] = useState<string[]>([]);

  const uploadMut = trpc.upload.permUpload.useMutation({
    onSuccess(data) {
      if (data.ok) {
        setResponseMsg(`Success: Image url is ${serverUrl}/img/${data.value}`);
        setUploads((state) => [...state, data.value]);
      }
    },
    onError(err) {
      setResponseMsg(`Error: ${err.message}`);
    },
  });
  const uploadFileData = async (data: string, type: string) => {
    await uploadMut.mutateAsync({ data, type }).catch((_) => null);
  };

  // read data from image file and upload
  const imageUploadRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!imageUploadRef.current) return;
    const file = imageUploadRef.current.files?.item(0);
    if (!file) {
      setResponseMsg("Choose a file first");
      return;
    }
    const reader = new FileReader();
    reader.onload = async (e) => {
      const result = e.target?.result;
      if (!result) {
        setResponseMsg("Failed to process file.");
        return;
      }
      // split removes invalid parts of the base64 string
      await uploadFileData((result as string).split(",")[1], file.type);
    };
    reader.readAsDataURL(file);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <input type="file" accept="image/*" ref={imageUploadRef} />
        </label>
        <button type="submit">UPLOAD</button>
        {responseMsg.length ? <p>{responseMsg}</p> : null}
      </form>
      <div>
        <ul>
          Uploads:
          {uploads.map((url) => (
            <li key={url}>
              <img src={`${serverUrl}/img/${url}`} height={100} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
