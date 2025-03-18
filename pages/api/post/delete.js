import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

export default async function handler(요청, 응답) {
    if (요청.method === 'DELETE') {
        try {
            const { id } = JSON.parse(요청.body);
            if (!id) {
                return 응답.status(400).json({ error: 'Invalid request: ID is required' });
            }

            const db = (await connectDB).db('forum');
            const result = await db.collection('post').deleteOne({ _id: new ObjectId(id) });

            if (result.deletedCount === 0) {
                return 응답.status(404).json({ error: 'Post not found or already deleted' });
            }

            응답.status(200).json({ message: 'Post deleted successfully' });
        } catch (error) {
            console.error('Error deleting post:', error);
            응답.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        응답.status(405).json({ error: 'Method Not Allowed' });
    }
}
