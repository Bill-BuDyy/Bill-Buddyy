import { Schema, model, Document, PaginateModel } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

interface BalanceInterface extends Document {
  user1: Schema.Types.ObjectId;
  user2: Schema.Types.ObjectId;
  amount: number;
  lastUpdated: Date;
}

const BalanceSchema = new Schema<BalanceInterface>({
  user1: {
    type: Schema.Types.ObjectId,
    ref: 'UserModel',
    required: true,
  },
  user2: {
    type: Schema.Types.ObjectId,
    ref: 'UserModel',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

BalanceSchema.plugin(paginate);

const BalanceModel = model<BalanceInterface, PaginateModel<BalanceInterface>>('Balance', BalanceSchema);

export default BalanceModel;
