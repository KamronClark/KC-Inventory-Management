import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Item } from './item';
import { ITEMS } from './mock-items';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})

export class ItemService {

  private itemsUrl = 'api/items';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /** GET Items from the server */
  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.itemsUrl)
      .pipe(
        tap(_ => this.log('fetched Items')),
        catchError(this.handleError<Item[]>('getItems', []))
      );
  }

  /** GET Item by id. Will 404 if id not found */
  getItem(id: number): Observable<Item> {
    const url = `${this.itemsUrl}/${id}`;
    return this.http.get<Item>(url).pipe(
      tap(_ => this.log(`fetched Item id=${id}`)),
      catchError(this.handleError<Item>(`getItem id=${id}`))
    );
  }

  /** PUT: update the Item on the server */
updateItem(Item: Item): Observable<any> {
  return this.http.put(this.itemsUrl, Item, this.httpOptions).pipe(
    tap(_ => this.log(`updated Item id=${Item.qty}`)),
    catchError(this.handleError<any>('updateItem'))
  );
}

/** POST: add a new Item to the server */
addItem(Item: Item): Observable<Item> {
  return this.http.post<Item>(this.itemsUrl, Item, this.httpOptions).pipe(
    tap((newItem: Item) => this.log(`added Item w/ id=${newItem.qty}`)),
    catchError(this.handleError<Item>('addItem'))
  );
}

/** DELETE: delete the Item from the server */
deleteItem(id: number): Observable<Item> {
  const url = `${this.itemsUrl}/${id}`;

  return this.http.delete<Item>(url, this.httpOptions).pipe(
    tap(_ => this.log(`deleted Item id=${id}`)),
    catchError(this.handleError<Item>('deleteItem'))
  );
}

/* GET Items whose name contains search term */
searchItems(term: string): Observable<Item[]> {
  if (!term.trim()) {
    // if not search term, return empty Item array.
    return of([]);
  }
  return this.http.get<Item[]>(`${this.itemsUrl}/?name=${term}`).pipe(
    tap(x => x.length ?
       this.log(`found Items matching "${term}"`) :
       this.log(`no Items matching "${term}"`)),
    catchError(this.handleError<Item[]>('searchItems', []))
  );
}

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** Log a ItemService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`ItemService: ${message}`);
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}
