import { serverUrl } from "@/data/url";
import { trpc } from "@/utils/trpc";
import { Ref, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function ImagesPage() {
  const imgRefs = trpc.retrieve.getAll.useInfiniteQuery(
    {},
    { getNextPageParam: (lastPage) => lastPage.nextcursor }
  );

  const [imageFilter, setImageFilter] = useState("");
  const deleteModalRef = useRef<HTMLDialogElement>(null);

  if (!imgRefs.data) {
    return <>Loading...</>;
  }
  return (
    <div className="page">
      <div className="d-flex justify-content-start align-items-start gap-2 flex-wrap">
        <Link to="/" className="btn btn-primary rounded-0">
          HOME
        </Link>
        <button
          className="btn btn-danger rounded-0"
          title="open delete modal"
          onClick={() => deleteModalRef.current?.showModal()}
        >
          DELETE IMAGE
        </button>
      </div>
      <DeleteImageModal refProp={deleteModalRef} />
      <h1 className="text-center">All Images</h1>
      <form style={{ maxWidth: 500 }} className="mx-auto">
        <label>filter images:</label>
        <input
          placeholder="filter query"
          className="form-control mb-3"
          onChange={(e) => setImageFilter(e.target.value)}
        />
      </form>
      <ul
        className="navbar-nav flex-row flex-wrap justify-content-center gap-2 mx-auto"
        style={{ maxWidth: 1200 }}
      >
        {imgRefs.data?.pages.map((page) =>
          page.value
            .filter((imageRef) => imageRef.name.includes(imageFilter))
            .map((imageRef) => (
              <DisplayImageComponent key={imageRef.url} serverUrl={serverUrl} imageRef={imageRef} />
            ))
        ) ?? null}
      </ul>
    </div>
  );
}

function DeleteImageModal(props: { refProp: Ref<HTMLDialogElement> }) {
  const [url, setUrl] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const deleteImageMut = trpc.delete.withUrl.useMutation({});

  //TODO: button to send delete request
  return (
    <dialog
      ref={props.refProp}
      className={`mx-auto my-auto p-2`}
      style={{ minWidth: "min(500px, 100%)", width: "fit-content", height: "min(350px, 100%)" }}
    >
      <div className="d-flex align-items-center h-100">
        <div className="d-flex flex-column justify-content-center">
          <h3>Delete Image</h3>
          <form
            className="mb-2"
            onSubmit={(e) => {
              e.preventDefault();
              setShowPreview(true);
            }}
          >
            <label>URL:</label>
            <div className="input-group">
              <input
                placeholder={"x_xxxxxxxxxx"}
                className="form-control"
                onChange={(e) => {
                  setUrl(e.target.value);
                  setShowPreview(false);
                }}
              />
              <button type="submit" className="btn btn-outline-danger" disabled={!url.length}>
                search
              </button>
            </div>
          </form>
          <form method="dialog" className="d-flex justify-content-start align-items-center gap-2">
            <button className="btn btn-outline-secondary">CANCEL</button>
            {showPreview ? <button className="btn btn-danger">DELETE</button> : null}
          </form>
        </div>
        {showPreview ? <img src={serverUrl + "/img/" + url} height={100} /> : null}
      </div>
    </dialog>
  );
}

function DisplayImageComponent(props: {
  imageRef: { url: string; name: string };
  serverUrl: string;
}) {
  return (
    <li className="mb-2">
      <a target="_blank" href={`${props.serverUrl}/img/${props.imageRef.url}`}>
        <img src={`${props.serverUrl}/img/${props.imageRef.url}`} height={250} />
      </a>
    </li>
  );
}
