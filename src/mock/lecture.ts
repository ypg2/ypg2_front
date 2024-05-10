import { fakerKO as faker } from "@faker-js/faker";
import { Lecture } from "../models/lecture.model";

export const mockLectureData: Lecture[] = Array.from({ length: 50 }).map(
  (_, idx) => ({
    lectureID: idx,
    title: faker.lorem.words(),
    lecturer: `${faker.person.lastName()}${faker.person.firstName()}`,
    introduction: faker.lorem.paragraph(),
    imgURL: `https://picsum.photos/id/${idx}/600/600`,
    categories: [faker.lorem.words()],
  })
);
