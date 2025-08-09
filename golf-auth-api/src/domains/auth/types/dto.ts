  export interface CreateUser {
    email: string;
    password: string;
  }

  export interface UserResponseDTO {
    id: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  }