import { http, HttpResponse } from "msw";
import { fakerKO as faker } from "@faker-js/faker";
import { BASE_URL } from "../api/http";
import { User } from "../models/user.model";

const mockUserData: User = {
  id: faker.number.int(),
  username: `${faker.person.lastName()}${faker.person.firstName()}`,
  email: "test@test.com",
  password: "password1234",
};

export const loginHandler = http.post(
  `${BASE_URL}/users/log-in`,
  async ({ request }) => {
    const result: any = await request.json();
    const username = result?.email;
    const password = result?.password;

    if (
      username === mockUserData.username &&
      password === mockUserData.password
    ) {
      return HttpResponse.json(
        {
          message: "로그인 성공",
          jwt: "fakejwt",
        },
        { status: 200 }
      );
    } else {
      return HttpResponse.json(
        { message: "Invalid id or password" },
        { status: 401 }
      );
    }
  }
);

export const joinHandler = http.post(`${BASE_URL}/users/sign-up`, () => {
  return HttpResponse.json({ message: "회원가입 성공" }, { status: 200 });
});
