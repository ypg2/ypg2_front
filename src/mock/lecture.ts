import { http, HttpResponse } from "msw";
import { fakerKO as faker } from "@faker-js/faker";
import { Lecture } from "../models/lecture.model";
import { BASE_URL } from "../api/http";

export const mockLectureData: Lecture[] = Array.from({ length: 50 }).map(
  (_, idx) => ({
    lectureID: idx,
    title: faker.lorem.words(),
    lecturer: `${faker.person.lastName()}${faker.person.firstName()}`,
    introduction: faker.lorem.paragraph(),
    imgURL: `https://picsum.photos/id/${idx}/600/600`,
  })
);

// export const allLectures = http.get(`${BASE_URL}/lectures`, () => {
//   return HttpResponse.json(mockLectureData, { status: 200 });
// });

// export const lectureById = http.get(
//   `${BASE_URL}/lectures/:id`,
//   async ({ request, params, cookies }) => {
//     // let { id } = params;
//     return HttpResponse.json(mockLectureData[1], { status: 200 });
//   }
// );
