
'use client'
import { useState, useEffect } from 'react'
function Preview({file}:{file:File}){
  const [url,setUrl] = useState('')
  useEffect(()=>{ const u=URL.createObjectURL(file); setUrl(u); return ()=>URL.revokeObjectURL(u)},[file])
  const img = file.type?.startsWith('image/')
  return (<div className="border rounded-xl overflow-hidden">{img?<img src={url} className="w-full h-28 object-cover" alt={file.name}/>:<div className="w-full h-28 grid place-items-center text-xs text-gray-600 bg-yellow-50">{file.name}</div>}<div className="px-2 py-1 text-xs text-gray-600 truncate">{file.name}</div></div>)
}
export default function Uploads(){
  const [facade,setFacade]=useState<File[]>([])
  const [toiture,setToiture]=useState<File[]>([])
  const [combles,setCombles]=useState<File[]>([])
  const [compteur,setCompteur]=useState<File[]>([])
  const [facture,setFacture]=useState<File[]>([])
  const onAdd=(setter:any)=>(e:any)=>{const fl=Array.from(e.target.files||[]); setter((cur:File[])=>cur.concat(fl)); e.currentTarget.value=''}
  return (
    <main className="max-w-3xl mx-auto px-4 py-10 space-y-6">
      <div className="card">
        <h1 className="text-xl font-semibold mb-2">Téléversements (photos & documents)</h1>
        {['Façade','Toiture (extérieur)','Combles (intérieur)','Compteur (Linky)','Facture d’électricité'].map((label, idx)=>{
          const map=[facade,toiture,combles,compteur,facture]; const setMap=[setFacade,setToiture,setCombles,setCompteur,setFacture]; const accept = idx===4?'application/pdf,image/*':'image/*'
          return (<div key={idx} className="mb-5"><h3 className="font-medium mb-2">{label}</h3><div className="flex flex-wrap gap-3 items-center">
            <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-[#0A2342] text-[#0A2342] hover:bg-yellow-50">⬆️ Ajouter<input type="file" className="hidden" accept={accept} multiple onChange={onAdd(setMap[idx])}/></label>
            {!!map[idx]?.length && <span className="text-sm text-[#0A2342]/70">{map[idx].length} fichier(s)</span>}</div>
            {map[idx]?.length>0 && <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">{map[idx].map((f:any,i:number)=><Preview key={i} file={f}/>)}</div>}</div>)
        })}
        <div className="text-xs text-[#0A2342]/60 mt-2">Prototype offline : les fichiers sont seulement prévisualisés. La version connectée Supabase les envoie en stockage privé.</div>
      </div>
    </main>
  )
}
