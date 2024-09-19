import { useEffect, useState } from "react";


export const useWrapPromise = <T,>(promise: Promise<T>) => {

  const [data, setData] = useState<T>();

  useEffect(() => {
    promise.then(
      (response) => {
        setData(response);
      }
    );
  });

  if (!data) {
    throw new Promise((resolve) => {
      promise.then((result) => {
        setData(result);
        resolve({});
      });
    });
  }
  return data;
};

type PromType = 'fulfilled' | 'rejected' | 'pending';
interface Prom<T> extends Promise<T> {
  value?: T;
  status?: PromType;
  reason?: string;
}

export function use<T,>(promise: Prom<T>) {
  if (promise.status === 'fulfilled') {
    return promise.value;
  } else if (promise.status === 'rejected') {
    throw promise.reason;
  } else if (promise.status === 'pending') {
    throw promise;
  } else {
    promise.status = 'pending';
    promise.then(
      result => {
        promise.status = 'fulfilled';
        promise.value = result;
      },
      reason => {
        promise.status = 'rejected';
        promise.reason = reason;
      },
    );
    throw promise;
  }
}

