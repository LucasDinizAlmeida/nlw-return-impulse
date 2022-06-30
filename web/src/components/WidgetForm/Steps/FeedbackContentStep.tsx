import { ArrowLeft, Camera } from "phosphor-react";
import { CloseButton } from "../../CloseButton";

import { feedbackTypes, FeedbackType } from "..";
import { ScreenshotButton } from "../ScreenshotButton";
import { FormEvent, useState } from "react";
import { api } from "../../../lib/api";
import { Loading } from "../../Loading";

interface FeedbackContentStep {
  onFeedbackSent: () => void
  feedbackType: FeedbackType
  onFeedbackRestartRequest: () => void
}

export function FeedbackContentStep({ feedbackType, onFeedbackRestartRequest, onFeedbackSent }: FeedbackContentStep) {


  const [comment, isComment] = useState('')

  const [screenshot, setScreenshot] = useState<string | null>(null)

  const feedbackTypeInfo = feedbackTypes[feedbackType]

  const [isSendingFeedback, setIsSendingFeedback] = useState(false)

  async function handleOnSubmit(event: FormEvent) {
    event.preventDefault()

    try {
      setIsSendingFeedback(true)

      await api.post('/feedbacks', {
        type: feedbackType,
        comment,
        screenshot
      })

      onFeedbackSent()
      setIsSendingFeedback(false)

    } catch (error) {
      console.log(error)
    }

  }

  return (
    <>
      <header>

        <button
          onClick={onFeedbackRestartRequest}
          className="absolute top-5 left-5 text-zinc-400 hover:text-zinc-100"
          type="button">
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>
        <span className="text-xl leading-6 flex items-center gap-2">
          <img
            src={feedbackTypeInfo.image.source}
            alt={feedbackTypeInfo.image.alt}
            className="w-6 h-6" />
          {feedbackTypeInfo.title}
        </span>
        <CloseButton />

      </header>

      <form
        className="my-4 w-full"
        onSubmit={handleOnSubmit}
      >

        <textarea
          placeholder="Conte com detalhes o que está acontecendo..."
          className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
          onChange={event => isComment(event.target.value)}
        />

        <footer className="flex gap-2 mt-2">
          <ScreenshotButton
            screenshot={screenshot}
            onScreenshotTook={setScreenshot}
          />
          <button
            disabled={comment.length == 0 || isSendingFeedback}
            type="submit"
            className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50"
          >
            {isSendingFeedback ? <Loading /> : 'Enviar feedback'}
          </button>
        </footer>
      </form>
    </>
  )
}