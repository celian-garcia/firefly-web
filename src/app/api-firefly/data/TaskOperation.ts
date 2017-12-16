export class TaskOperation {
    id: number;
    type: string;
    element: Element;
}

export class Element {
    id: number;
    type: string;
    value: Point;
}

export class Point {
    x: number;
    y: number;
    z: number;
}
