import pandas as pd


def get_duplicates(df: pd.DataFrame, n_rows: int) -> dict:
    num_duplicates = df.duplicated().sum()

    return {"duplicates": {"num_duplicates": num_duplicates,
                                        "proportion_duplicated": num_duplicates / n_rows}}
