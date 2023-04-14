import { FormEvent, useRef, useState } from "react";
import { trpc } from "@/utils/trpc";
import { serverUrl } from "@/data/url";
import { Link } from "react-router-dom";

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
      // reset file input when done
      imageUploadRef.current ? (imageUploadRef.current.value = "") : null;
    };
    reader.readAsDataURL(file);
  };
  return (
    <div className="page">
      <div>
        <Link to="/" className="btn btn-primary rounded-0">
          HOME
        </Link>
        <h2 className="text-center">Upload Image Files to Tobsmg server</h2>
      </div>
      <div
        className="mx-auto d-flex justify-content-between align-items-center px-4"
        style={{ maxWidth: 1200 }}
      >
        <form onSubmit={handleSubmit}>
          <label className="d-block mb-3">
            <span className="d-block mb-1">Select a file to upload</span>
            <input className="form-control" type="file" accept="image/*" ref={imageUploadRef} />
          </label>
          <button type="submit" className="btn btn-success">
            UPLOAD
          </button>
          {responseMsg.length ? <p>{responseMsg}</p> : null}
        </form>
        {uploads.length ? (
          <div>
            <h3 className="text-center">Uploads:</h3>
            <ul className="navbar-nav d-flex flex-row flex-wrap gap-1">
              {uploads.map((url) => (
                <li key={url} className="mb-2">
                  <img src={`${serverUrl}/img/${url}`} height={100} />
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}
