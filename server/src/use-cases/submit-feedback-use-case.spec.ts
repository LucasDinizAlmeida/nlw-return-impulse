import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

describe('Submit feedback', () => {

  const submitFeedback = new SubmitFeedbackUseCase(
    { create: async() => {} },
    { sendMail: async() => {} }
  )

  it('should be able to submit a feedback', async() => {

    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'tá tudo bugado',
      screenshot: 'data:image/png;base64'
    })).resolves.not.toThrow()
  })


  it('should not be able to submit feedback without type', async() => {

    await expect(submitFeedback.execute({
      type: '',
      comment: 'tá tudo bugado',
      screenshot: 'data:image/png;base64'
    })).rejects.toThrow()
  })

  it('should not be able to submit feedback without comment', async() => {

    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64'
    })).rejects.toThrow()
  })

})