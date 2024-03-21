export interface TaskDescriptionProps {
  title: string;
  description: string;
  registrationDate: Date;
  deadline: Date;
  priority: number;
  taskStatus: boolean;
  mikanQuality: number;
}
