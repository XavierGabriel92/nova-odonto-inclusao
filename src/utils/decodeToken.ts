import jwt from "jsonwebtoken";
type props = {
  authorization: string;
};

export function decodeToken({ authorization }: props) {
  var decoded = jwt.verify(authorization!.replace("Bearer ", ""), "superkey");

  const company = (decoded as any).company;
  return company;
}
