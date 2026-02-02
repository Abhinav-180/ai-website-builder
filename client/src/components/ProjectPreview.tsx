import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import type { Project } from '../types'
import { iframeScript } from '../assets/assets'
import EditorPanel from './EditorPanel'
import LoaderSteps from './LoaderSteps'

interface ProjectPreviewProps {
  project: Project
  isGenerating: boolean
  device?: 'phone' | 'tablet' | 'desktop'
  showEditorPanel?: boolean
}

export interface ProjectPreviewRef {
  getCode: () => string | undefined
}

const ProjectPreview = forwardRef<
  ProjectPreviewRef,
  ProjectPreviewProps
>(
  (
    {
      project,
      isGenerating,
      device = 'desktop',
      showEditorPanel = true,
    },
    ref
  ) => {
    const iframeRef = useRef<HTMLIFrameElement>(null)

    const [selectedElement, setSelectedElement] = useState<any>(null)

    const resolutions = {
      phone: 'w-[412px]',
      tablet: 'w-[768px]',
      desktop: 'w-full',
    }


    useImperativeHandle(ref, () => ({
      getCode: () => {
        const doc = iframeRef.current?.contentDocument
        if (!doc) return undefined

        // 1. Remove our selection class / attributes / outline from all elements
        doc
          .querySelectorAll('.ai-selected-element,[data-ai-selected]')
          .forEach((el) => {
            el.classList.remove('ai-selected-element')
            el.removeAttribute('data-ai-selected')
              ; (el as HTMLElement).style.outline = ''
          })

        // 2. Remove injected style + script from the document
        const previewStyle = doc.getElementById('ai-preview-style')
        if (previewStyle) previewStyle.remove()

        const previewScript = doc.getElementById('ai-preview-script')
        if (previewScript) previewScript.remove()

        // 3. Serialize clean HTML
        const html = doc.documentElement.outerHTML
        return html




      },
    }))


    useEffect(() => {
      const handleMessage = (event: MessageEvent) => {
        if (event.data?.type === 'ELEMENT_SELECTED') {
          setSelectedElement(event.data.payload)
        } else if (event.data?.type === 'CLEAR_SELECTION') {
          setSelectedElement(null)
        }
      }

      window.addEventListener('message', handleMessage)

      return () => {
        window.removeEventListener('message', handleMessage)
      }
    }, [])

    const handleUpdate = (updates: any) => {
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          {
            type: 'UPDATE_ELEMENT',
            payload: updates,
          },
          '*'
        )
      }
    }






    const injectPreview = (html: string) => {
      if (!html) return ''

      const tailwindCDN = `
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      html, body {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
      }
    </style>
  `

      // ✅ IF already full HTML
      if (html.includes('<html')) {
        // Inject both Tailwind and editor script before closing </body>
        const withTailwind = html.replace('</head>', tailwindCDN + '</head>')
        return withTailwind.replace('</body>', iframeScript + '\n</script>\n</body>')
      }

      // ✅ IF partial HTML (MOST IMPORTANT FIX)
      return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        ${tailwindCDN}
      </head>
      <body>
        ${html}
        ${iframeScript}
        </script>
      </body>
    </html>
  `
    }



    return (
      <div className="relative h-full bg-gray-900 overflow-hidden">
        {project.current_code ? (
          <div className="h-full w-full">
            <iframe
              ref={iframeRef}
              srcDoc={injectPreview(project.current_code)}
              className={`
            h-full
            ${resolutions[device]}
            mx-auto
            transition-all
            duration-300
            bg-white
          `}
            />

            {showEditorPanel && selectedElement && (
              <EditorPanel
                selectedElement={selectedElement}
                onUpdate={handleUpdate}
                onClose={() => {
                  setSelectedElement(null)
                  iframeRef.current?.contentWindow?.postMessage(
                    { type: 'CLEAR_SELECTION_REQUEST' },
                    '*'
                  )
                }}
              />
            )}
          </div>
        ) : (
          isGenerating && (
            <LoaderSteps />
          )
        )}
      </div>
    )



  }
)

export default ProjectPreview
