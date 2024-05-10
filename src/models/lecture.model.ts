export interface Lecture {
  lectureID: number;
  imgURL: string;
  title: string;
  lecturer: string;
  introduction: string;
}

export interface LectureDetail extends Lecture {
  categories: string[];
}
