export class ObjectManager<T> {
    private storage: T[]
    private returnObjectCallback: (object: T) => void
    private createObjectCallback: () => T

    public constructor(returnObjectCallback: (object: T) => void, createObjectCallback: () => T) {
        this.storage = []
        this.returnObjectCallback = returnObjectCallback
        this.createObjectCallback = createObjectCallback
    }
    public getObject(): T {
        let obj = null
        if (this.storage.length > 0) {
            obj = this.storage.pop()
        } else {
            obj = this.createObjectCallback()
        }
        return obj!
    }

    public returnObject(object: T): void {
        this.returnObjectCallback(object)
        this.storage.push(object)
    }
}
