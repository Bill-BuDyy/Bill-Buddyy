import { Schema, model, Document, PaginateModel } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

interface NotificationInterface extends Document {
  type: string;
  message: string;
  recipient: Schema.Types.ObjectId;
  createdAt: Date;
  read: boolean;
}

const NotificationSchema = new Schema<NotificationInterface>({
  type: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  recipient: {
    type: Schema.Types.ObjectId,
    ref: 'UserModel',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  read: {
    type: Boolean,
    default: false,
  },
});

NotificationSchema.plugin(paginate);

const NotificationModel = model<NotificationInterface, PaginateModel<NotificationInterface>>('Notification', NotificationSchema);

export default NotificationModel;
