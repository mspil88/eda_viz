import pandas as pd


def get_shape(df: pd.DataFrame) -> dict:
    return {"overview": {"shape": df.shape}}