import { Injectable } from '@angular/core';
import { category } from './post.model';
import { Subject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment} from "../../environments/environment"

const BACKEND_URL = "http://ascaorigin.ap-south-1.elasticbeanstalk.com/api"+ "/category/"


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categories: category[] = [];

  private categoriesUpdated = new Subject<category[]>();

  constructor(private http: HttpClient) { }

  getCategoryUpdateListner() {
    return this.categoriesUpdated.asObservable();
  }

  addCategory(name: string) {
    let category: category = {
      id: "",
      name: name
    }
    this.http.post<{ message: string, category: category }>(BACKEND_URL+'add', category).subscribe((response) => {
      category = {
        id: response.category.id,
        name: response.category.name,
      }
      console.log(category)
      this.categories.push(category);
      console.log(this.categories)
      this.categoriesUpdated.next([...this.categories])

    })
  }

  getCategories() {
    this.http.get(BACKEND_URL+'get-all').pipe(map((categoryData: any) => {
      return categoryData.categories.map((category: any) => {
        return {
          id: category._id,
          name: category.name
        }
      })
    })).subscribe((transformedCategories)=>{
      this.categories = transformedCategories;
      this.categoriesUpdated.next([...this.categories])
    })
  }

}
