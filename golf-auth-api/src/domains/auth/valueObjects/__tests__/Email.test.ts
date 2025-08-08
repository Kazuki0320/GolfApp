import { Email } from "../Email";

describe("Email", () => {
  describe("create", () => {
    describe("正常系", () => {
      it.each([
        ["基本的なメールアドレス", "test@example.com"],
        ["サブドメインを含むメールアドレス", "test@sub.example.com"],
        ["ドットを含むローカル部", "test.user@example.com"]
      ])("%s", (_, email) => {
        const emailVO = Email.create(email);
        expect(emailVO.toString()).toBe(email);
      });
    });

    describe("異常系", () => {
      it.each([
        ["空文字", "", "メールアドレスは必須です"],
        ["@がない", "invalid-email", "メールアドレスが無効です"],
        ["ドメインがない", "test@", "メールアドレスが無効です"],
        ["ローカル部がない", "@example.com", "メールアドレスが無効です"],
        ["スペースを含む", "test @example.com", "メールアドレスが無効です"]
      ])("%s", (_, email, expectedError) => {
        expect(() => {
          Email.create(email);
        }).toThrow(expectedError);
      });
    });
  });
}); 