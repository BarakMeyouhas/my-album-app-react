export class Category {
    public category_id: number;
    public name: string;
  
    public constructor(id: number, name: string) {
      this.category_id = id;
      this.name = name;
    }
  }