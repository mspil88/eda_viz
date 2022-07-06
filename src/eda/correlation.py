from abc import ABC, abstractmethod
from itertools import combinations
import pandas as pd
import numpy as np
import scipy.stats as stats


class Correlation(ABC):
    @abstractmethod
    def calculate(df):
        pass


class Spearman(Correlation):
    def calculate(self, df):
        return df.corr(method="spearman")


class Pearson(Correlation):
    def calculate(self, df):
        return df.corr(method="pearson")


class Cramer(Correlation):
    '''presuppose some sort of summary object
    {'datatypes: {'v1': categorical}
    '''

    def corrected_cramers(self, cross_tab):
        chi2 = stats.chi2_contingency(cross_tab)[0]
        n = np.sum(cross_tab.sum())
        phi2 = chi2/n
        r, k = cross_tab.shape

        with np.errstate(divide="ignore", invalid="ignore"):
            phi2corr = max(0, phi2 - ((k-1)*(r-1))/(n-1))
            rcorr = r - ((r-1)**2)/(n-1)
            kcorr = k - ((k-1)**2)/(n-1)
            return 1 if rcorr == 0 else np.sqrt(phi2corr / min((kcorr-1), (rcorr-1)))

    def initialise_matrix(self, vars):
        r_c = len(vars)
        m = np.zeros((r_c, r_c))
        np.fill_diagonal(m, 1)
        return pd.DataFrame(m, index=vars, columns=vars)

    def calculate(self, df, summary):
        #categorical_variables = [key for key, value in summary["datatypes"].items() if value == "categorical"]
        #cramers_matrix = self.initialise_matrix(categorical_variables)
        categorical_variables = summary
        cramers_matrix = self.initialise_matrix(summary)

        if len(categorical_variables) == 0:
            return None
        for v1, v2 in list(combinations(categorical_variables, 2)):
            temp_cross_tab = pd.crosstab(df[v1], df[v2])
            corr = self.corrected_cramers(temp_cross_tab)
            cramers_matrix.loc[v2, v1] = corr
            cramers_matrix.loc[v1, v2] = cramers_matrix.loc[v2, v1]
        return cramers_matrix


class Kendall(Correlation):
    def calculate(self, df):
        return df.corr(method="kendall")


def correlations(df: pd.DataFrame):
    pearson = Pearson().calculate(df).to_dict()
    spearman = Spearman().calculate(df).to_dict()
    kendall = Kendall().calculate(df).to_dict()

    return {"correlation": {"pearson": pearson, "spearman": spearman, "kendall": kendall}}
