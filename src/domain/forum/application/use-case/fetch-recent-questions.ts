import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'

interface FetchRecentQuestionRequest {
  page: number
}

interface FetchRecentQuestionResponse {
  questions: Question[]
}

export class FetchRecentQuestionsUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    page,
  }: FetchRecentQuestionRequest): Promise<FetchRecentQuestionResponse> {
    const questions = await this.questionsRepository.findManyRecent({ page })

    return { questions }
  }
}
