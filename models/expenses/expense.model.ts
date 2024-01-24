import { Schema, model, Document, PaginateModel } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

interface ExpenseInterface extends Document {
  description: string;
  amount: number;
  paidBy: Schema.Types.ObjectId;
  splitAmong: Schema.Types.ObjectId[];
  group: Schema.Types.ObjectId;
  createdAt: Date;
}

const ExpenseSchema = new Schema<ExpenseInterface>({
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paidBy: {
    type: Schema.Types.ObjectId,
    ref: 'UserModel',
    required: true,
  },
  splitAmong: [{
    type: Schema.Types.ObjectId,
    ref: 'UserModel',
  }],
  group: {
    type: Schema.Types.ObjectId,
    ref: 'GroupModel',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

ExpenseSchema.plugin(paginate);

const ExpenseModel = model<ExpenseInterface, PaginateModel<ExpenseInterface>>('Expense', ExpenseSchema);

export default ExpenseModel;

