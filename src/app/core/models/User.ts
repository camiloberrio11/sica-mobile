export interface User {
  id: string;
  name: Name;
  department: string;
  city: string;
  token: string;
  document: string;
}

interface Name {
  first: string;
  last: string;
}
