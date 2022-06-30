
import bugImg from '../../assets/bug.svg'
import ideaImg from '../../assets/idea.svg'
import thoughtImg from '../../assets/thought.svg'
import { useState } from "react";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackSuccessStep } from './Steps/FeedbackSuccessStep';

export const feedbackTypes = {
  BUG: {
    title: 'Problema',
    image: {
      source: bugImg,
      alt: 'Imagem de um inseto'
    }
  },
  IDEA: {
    title: 'Idéia',
    image: {
      source: ideaImg,
      alt: 'Imagem de um inseto'
    }
  },
  OTHER: {
    title: 'Outro',
    image: {
      source: thoughtImg,
      alt: 'Imagem de um inseto'
    }
  },
}


export type FeedbackType = keyof typeof feedbackTypes


export function WidgetForm() {

  const [feedbackSent, setFeedbackSent] = useState(false)

  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)

  function handleRestartFeedback() {
    setFeedbackSent(false)
    setFeedbackType(null)
  }

  function handleFeedbackSent() {
    setFeedbackSent(true)
  }


  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">


      {

        feedbackSent ? (

          <FeedbackSuccessStep
            onFeedbackRestartRequest={handleRestartFeedback}
          />

        ) : (!feedbackType ? (
          <FeedbackTypeStep
            onFeedbackTypeChanged={setFeedbackType}
          />
        ) : (
          <FeedbackContentStep
            onFeedbackSent={handleFeedbackSent}
            onFeedbackRestartRequest={handleRestartFeedback}
            feedbackType={feedbackType}
          />
        )
        )
      }

      <footer className="text-xs text-neutral-400 ">
        Feito com ♥ pela <a className="underline underline-offset-2" href="https://rocketseat.com.br" target="_blank">Rocketseat</a>
      </footer>
    </div>
  )
}