"use client";

import { useState } from "react";

export default function Page() {
  const [facade, setFacade] = useState<File[]>([]);
  const [toiture, setToiture] = useState<File[]>([]);
  const [combles, setCombles] = useState<File[]>([]);
  const [compteur, setCompteur] = useState<File[]>([]);
  const [facture, setFacture] = useState<File[]>([]);

  const onAdd =
    (setter: React.Dispatch<React.SetStateAction<File[]>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files: File[] = e.currentTarget.files
        ? Array.from(e.currentTarget.files)
        : [];
      setter((cur) => cur.concat(files));
      e.currentTarget.value = "";
    };

  return (
    <main className="max-w-3xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-2xl font-bold">Freesolar — Upload documents</h1>

      <div className="card">
        <label>Photo façade</label>
        <input type="file" onChange={onAdd(setFacade)} />
      </div>

      <div className="card">
        <label>Photo toiture</label>
        <input type="file" onChange={onAdd(setToiture)} />
      </div>

      <div className="card">
        <label>Photo combles</label>
        <input type="file" onChange={onAdd(setCombles)} />
      </div>

      <div className="card">
        <label>Photo compteur</label>
        <input type="file" onChange={onAdd(setCompteur)} />
      </div>

      <div className="card">
        <label>Facture électricité</label>
        <input type="file" onChange={onAdd(setFacture)} />
      </div>
    </main>
  );
}
