import { Either, right } from '@/core/either'
import { NotificationsRepository } from '../repositories/notifications-repository'
import { Notification } from '../../enterprise/entities/notification'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface SendNotificationRequest {
  recipientId: string
  title: string
  content: string
}

export type SendNotificationResponse = Either<
  null,
  { notification: Notification }
>

export class SendNotificationUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({
    recipientId,
    title,
    content,
  }: SendNotificationRequest): Promise<SendNotificationResponse> {
    const notification = await Notification.create({
      recipientId: new UniqueEntityId(recipientId),
      title,
      content,
    })

    await this.notificationsRepository.create(notification)

    return right({ notification })
  }
}
