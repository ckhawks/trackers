User
- id: UUID
- username: string
- email: string
- password: string salted or something

Tracker
- id: UUID
- name: string
- slug: string
- userId: FK UUID
- description: string
- createdAt
- updatedAt
- deletedAt

Progress
- id
- date: DATETIME
- points: int
- summary: string
- trackerId: FK UUID
- createdAt
- updatedAt
- deletedAt