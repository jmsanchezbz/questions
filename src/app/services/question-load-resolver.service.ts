import { inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ResolveFn,
} from "@angular/router";
import { Observable } from "rxjs";
import { Question } from "../model/question";
import { QuestionService } from "./question.service";

export const questionLoadResolveFn: ResolveFn<Question> = (
  route: ActivatedRouteSnapshot
): Question | Observable<Question> | Promise<Question> => {
  const service = inject(QuestionService);
   

  const id = parseInt(route.paramMap.get("id"), 10);
  console.log('QuestionLoadResolver: ' + id);
  return service.findById(id);
};
