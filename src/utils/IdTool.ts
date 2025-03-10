import { v4 as uuidv4 } from 'uuid';
/**
 * 生成一个唯一的ID
 * @returns 
 */
function generateId() {
    return uuidv4()
}

export { generateId }


