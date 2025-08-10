  export interface UserResponseDTO {
    id: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface CreateUserDTO {
    email: string;
    password: string;
  }