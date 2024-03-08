import { Question } from '../../enterprise/entities/question'
import { AnswerRepository } from '../repositories/answer-repository'
import { QuestionsRepository } from '../repositories/questions-repository'

interface ChooseAnswerBestQuestionRequest {
  authorId: string
  answerId: string
}

interface ChooseAnswerBestQuestionResponse {
  question: Question
}

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private questionRepository: QuestionsRepository,
    private answerRepository: AnswerRepository,
  ) {}

  async execute({
    authorId,
    answerId,
  }: ChooseAnswerBestQuestionRequest): Promise<ChooseAnswerBestQuestionResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found.')
    }

    const question = await this.questionRepository.findById(
      answer.questionId.toString(),
    )

    if (!question) {
      throw new Error('Question not found.')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowed.')
    }

    question.bestAnswerId = answer.id

    await this.questionRepository.save(question)

    return { question }
  }
}
