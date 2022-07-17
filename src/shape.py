import pandas as pd


def get_shape(df: pd.DataFrame) -> tuple:
    shape = df.shape
    return ({"rows": shape[0]},
            {"variables": shape[1]})