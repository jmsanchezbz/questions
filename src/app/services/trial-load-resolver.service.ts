import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { Observable } from "rxjs";
import { Trial } from "../model/trial";
import { TrialService } from "./trial.service";

export const trialLoadResolveFn: ResolveFn<Trial> = (
  route: ActivatedRouteSnapshot
): Trial | Observable<Trial> | Promise<Trial> => {
  const service = inject(TrialService);

  const id = parseInt(route.paramMap.get("id"), 10);
  console.log("TrialLoadResolver: " + id);
  return service.findById(id);
};
