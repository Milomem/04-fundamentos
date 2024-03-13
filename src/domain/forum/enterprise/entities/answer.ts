import { Optional } from '@/core/types/optional'
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id'
import { AnswerAttachmentList } from './answer-attachment-list'
import { AggregateRoot } from '@/core/entities/aggregate-root'
import { AnswerCreatedEvent } from '../event/answer-created-event'

export interface AnswerProps {
  createdAt: Date
  content: string
  authorId: UniqueEntityId
  questionId: UniqueEntityId
  attachments: AnswerAttachmentList
  updatedAt?: Date
}

export class Answer extends AggregateRoot<AnswerProps> {
  get authorId() {
    return this.props.authorId
  }

  get questionId() {
    return this.props.questionId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get content() {
    return this.props.content
  }

  get except() {
    return this.content.substring(0, 120).trimEnd().concat('...')
  }

  get attachments() {
    return this.props.attachments
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  set attachments(attachments: AnswerAttachmentList) {
    this.props.attachments = attachments
    this.touch()
  }

  static create(
    props: Optional<AnswerProps, 'createdAt' | 'attachments'>,
    id?: UniqueEntityId,
  ) {
    const answer = new Answer(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        attachments: props.attachments ?? new AnswerAttachmentList(),
      },
      id,
    )

    const isNewAnswer = !id

    if (isNewAnswer) {
      answer.addDomainEvent(new AnswerCreatedEvent(answer))
    }

    return answer
  }
}
