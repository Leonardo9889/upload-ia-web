import { Button } from "./components/ui/button";
import { Separator } from "./components/ui/separator";
import { Textarea } from "./components/ui/textarea";
import { Label } from "./components/ui/label";
import { Slider } from "./components/ui/slider";
import { Select, SelectContent, SelectTrigger, SelectItem, SelectValue } from "./components/ui/select";
import { FileVideo, Github, Upload, Wand2 } from 'lucide-react'
import { ChangeEvent, useMemo, useState } from "react";

export function App() {
  const [videoFile, setVideoFile] = useState<File | null>(null)

  function handleFileSelected(event: ChangeEvent<HTMLInputElement>){
    const { files } = event.currentTarget
  
    if(!files) {
      return
    }
    const selectedFile = files[0]

    setVideoFile(selectedFile)
  }  

  const previewURL = useMemo(() => {
    if(!videoFile) {
      return null
    }

    return URL.createObjectURL(videoFile)
  }, [videoFile])

  return (
    <div className="min-h-screen flex flex-col">
      <div className="px-6 py-3 flex items-center justify-between border-b">
        <h1 className="text-xl font-bold">upoad.Ai</h1>

        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foregroud">Estudos ☢️</span>

         <Separator orientation="vertical" className="h-6"/>

          <Button variant="outline">
            <Github className="w-4 h-4 mr-2"/>
            GitHub</Button>
        </div>
      </div>

      <main className="flex-1 p-6 flex gap-6">
        <div className="flex flex-col flex-1 gap-4">
           <div className="grid grid-row-2 gap-4 flex-1">
              <Textarea
               className="resize-none p-4 leading-relaxed"
               placeholder="Inclua o prompt para IA..."/>
              <Textarea
               className="resize-none p-4 leading-relaxed"
               placeholder="Reasultado gerado pela IA" 
               readOnly/>
           </div>
           <p className="text-sm text-muted-foregroud">
            Lembre-se: você pode utilizar a varável <code className="text-violet-400">{'{transcription}'}</code> no seu prompt para adicionar o conteúdo da transcrição do video selecionado.
           </p>
        </div>

        <aside className="w-80 space-y-6">
          <form className="space-y-6">
            <label htmlFor="video" className="relative border flex rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/5">
              {previewURL ? (
                <video src={previewURL}/>
              ) : (
                <>
                  <FileVideo/>
                  Selecione um video
                </>
                )}
            </label>

            <input type="file" id="video" accept="video/mp4" className="sr-only" onChange={handleFileSelected}/>

            <Separator/>

            <div className="space-y-2">
              <Label htmlFor="transcription_prompt">Prompt de transcrição</Label>
              <Textarea 
                id="transcription_prompt" 
                className="h-20 leading-relaxed resize-none"
                placeholder="Inclua palavras chave mencionadas no video separadas por virgula ( , )"/>
              
              <Button type="submit" className="w-full">
                Carregar video
                <Upload className="w-4 h-4 ml-2"/>
              </Button>
            </div>
          </form>

          <Separator/>

          <form className="space-y-6">
          <div className="space-y-2">
              <Label>Prompt</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um prompt..."/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="title">Título do Youtube</SelectItem>
                  <SelectItem value="description">Descrição do Youtube</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Modelo</Label>
              <Select disabled defaultValue="gpt-3.5">
                <SelectTrigger>
                  <SelectValue/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-3.5">
                    GPT 3.5-turbo 16k
                  </SelectItem>
                </SelectContent>
              </Select>
              <span className=" block text-xs textmuted-forgroud talic">
                Você poderá customizar esta oção em breve
              </span>
            </div>

            <Separator/>

            <div className="space-y-4">
              <Label>Temperatura</Label>
              <Slider 
                min={0}
                max={1}
                step={0.1}
              />
              <span className=" block text-xs textmuted-forgroud italic landing-relaxed">
                Valores mais altos tendem a deixar o resultado mais criativo e com possíveis erros.
              </span>
            </div>

            <Separator/>

            <Button type="submit" className="w-full">
              Executar
              <Wand2 className="w-4 h-4 ml-2"/>
            </Button>
          </form>
        </aside>
      </main>
    </div>
  )
}