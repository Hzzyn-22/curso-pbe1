const express=require("express"),fs=require("fs"),path=require("path"),cors=require("cors");
const app=express(),file=path.join(__dirname,"ocorrencias.json"); app.use(cors()); app.use(express.json());
const ler=()=>{try{const x=JSON.parse(fs.readFileSync(file,"utf8"));return Array.isArray(x)?x:[]}catch(e){return []}}; const salvar=x=>fs.writeFileSync(file,JSON.stringify(x,null,2)+"\\n");
app.get("/api/v1/ocorrencias",(q,s)=>s.json(ler()));
app.get("/api/v1/ocorrencias/montadora/:nome",(q,s)=>{const n=decodeURIComponent(q.params.nome).toLowerCase();s.json(ler().filter(x=>String(x.montadora||"").toLowerCase()===n))});
app.delete("/api/v1/ocorrencias/:id",(q,s)=>{const a=ler(),i=a.findIndex(x=>String(x.id)===String(q.params.id));if(i<0)return s.status(404).json({erro:"Ocorrencia nao encontrada"});const r=a.splice(i,1)[0];salvar(a);s.json({mensagem:"Ocorrencia removida com sucesso",ocorrencia:r})});
app.listen(process.env.PORT||3000,()=>console.log("API pronta"));
