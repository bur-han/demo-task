import CustomError from '../../App/Infrastructure/Exceptions/custom-error';

function handleError(err: any, res: any) {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  return res.status(500).json({ message: err.message });
}

export default handleError;
